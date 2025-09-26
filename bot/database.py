import os
import json
from datetime import datetime
from typing import Dict, List, Optional
import sqlite3

class Database:
    def __init__(self, db_path: str = "bot_data.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Inisialisasi database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Tabel users
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                username TEXT,
                first_name TEXT,
                last_name TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabel file_conversions
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS file_conversions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                original_file TEXT,
                converted_file TEXT,
                conversion_type TEXT,
                file_size INTEGER,
                status TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (user_id)
            )
        ''')
        
        # Tabel bot_stats
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS bot_stats (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE,
                total_users INTEGER DEFAULT 0,
                total_files INTEGER DEFAULT 0,
                total_conversions INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def add_user(self, user_id: int, username: str = None, first_name: str = None, last_name: str = None):
        """Tambahkan user baru"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO users (user_id, username, first_name, last_name, last_active)
            VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        ''', (user_id, username, first_name, last_name))
        
        conn.commit()
        conn.close()
    
    def update_user_activity(self, user_id: int):
        """Update aktivitas user"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE user_id = ?
        ''', (user_id,))
        
        conn.commit()
        conn.close()
    
    def add_conversion(self, user_id: int, original_file: str, converted_file: str, 
                      conversion_type: str, file_size: int, status: str = 'completed'):
        """Tambahkan record konversi"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO file_conversions 
            (user_id, original_file, converted_file, conversion_type, file_size, status)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (user_id, original_file, converted_file, conversion_type, file_size, status))
        
        conn.commit()
        conn.close()
    
    def get_user_stats(self, user_id: int) -> Dict:
        """Dapatkan statistik user"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Total konversi user
        cursor.execute('''
            SELECT COUNT(*) FROM file_conversions WHERE user_id = ?
        ''', (user_id,))
        total_conversions = cursor.fetchone()[0]
        
        # Konversi per jenis
        cursor.execute('''
            SELECT conversion_type, COUNT(*) 
            FROM file_conversions 
            WHERE user_id = ? 
            GROUP BY conversion_type
        ''', (user_id,))
        conversions_by_type = dict(cursor.fetchall())
        
        # File terbaru
        cursor.execute('''
            SELECT original_file, conversion_type, created_at
            FROM file_conversions 
            WHERE user_id = ? 
            ORDER BY created_at DESC 
            LIMIT 5
        ''', (user_id,))
        recent_files = cursor.fetchall()
        
        conn.close()
        
        return {
            'total_conversions': total_conversions,
            'conversions_by_type': conversions_by_type,
            'recent_files': recent_files
        }
    
    def get_bot_stats(self) -> Dict:
        """Dapatkan statistik bot"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Total users
        cursor.execute('SELECT COUNT(*) FROM users')
        total_users = cursor.fetchone()[0]
        
        # Total files processed
        cursor.execute('SELECT COUNT(*) FROM file_conversions')
        total_files = cursor.fetchone()[0]
        
        # Total size processed
        cursor.execute('SELECT SUM(file_size) FROM file_conversions')
        total_size = cursor.fetchone()[0] or 0
        
        # Konversi per hari (7 hari terakhir)
        cursor.execute('''
            SELECT DATE(created_at) as date, COUNT(*) as count
            FROM file_conversions 
            WHERE created_at >= datetime('now', '-7 days')
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        ''')
        daily_conversions = dict(cursor.fetchall())
        
        # Top conversion types
        cursor.execute('''
            SELECT conversion_type, COUNT(*) as count
            FROM file_conversions 
            GROUP BY conversion_type 
            ORDER BY count DESC 
            LIMIT 5
        ''')
        top_conversions = dict(cursor.fetchall())
        
        conn.close()
        
        return {
            'total_users': total_users,
            'total_files': total_files,
            'total_size_mb': round(total_size / (1024 * 1024), 2),
            'daily_conversions': daily_conversions,
            'top_conversions': top_conversions
        }
    
    def get_recent_activity(self, limit: int = 10) -> List[Dict]:
        """Dapatkan aktivitas terbaru"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT u.username, u.first_name, fc.original_file, fc.conversion_type, fc.created_at
            FROM file_conversions fc
            JOIN users u ON fc.user_id = u.user_id
            ORDER BY fc.created_at DESC
            LIMIT ?
        ''', (limit,))
        
        activities = []
        for row in cursor.fetchall():
            activities.append({
                'username': row[0] or row[1],
                'file': row[2],
                'type': row[3],
                'time': row[4]
            })
        
        conn.close()
        return activities
    
    def cleanup_old_data(self, days: int = 30):
        """Bersihkan data lama"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Hapus konversi lama
        cursor.execute('''
            DELETE FROM file_conversions 
            WHERE created_at < datetime('now', '-{} days')
        '''.format(days))
        
        # Hapus user yang tidak aktif
        cursor.execute('''
            DELETE FROM users 
            WHERE last_active < datetime('now', '-{} days')
        '''.format(days))
        
        conn.commit()
        conn.close()
    
    def export_data(self, file_path: str):
        """Export data ke JSON"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Ambil semua data
        cursor.execute('SELECT * FROM users')
        users = cursor.fetchall()
        
        cursor.execute('SELECT * FROM file_conversions')
        conversions = cursor.fetchall()
        
        data = {
            'users': users,
            'conversions': conversions,
            'export_date': datetime.now().isoformat()
        }
        
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
        
        conn.close()
