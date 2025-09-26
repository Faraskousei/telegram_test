#!/usr/bin/env python3
"""
Unit tests untuk Telegram Multi-Function Bot
"""

import unittest
import os
import sys
import tempfile
import shutil
from pathlib import Path

# Tambahkan direktori bot ke Python path
bot_dir = Path(__file__).parent.parent / 'bot'
sys.path.insert(0, str(bot_dir))

from file_processor import FileProcessor
from database import Database

class TestFileProcessor(unittest.TestCase):
    """Test cases untuk FileProcessor"""
    
    def setUp(self):
        """Setup test environment"""
        self.processor = FileProcessor()
        self.temp_dir = tempfile.mkdtemp()
        self.processor.temp_dir = self.temp_dir
        self.processor.output_dir = os.path.join(self.temp_dir, 'output')
        os.makedirs(self.processor.output_dir, exist_ok=True)
    
    def tearDown(self):
        """Cleanup test environment"""
        shutil.rmtree(self.temp_dir)
    
    def test_get_file_info(self):
        """Test get_file_info method"""
        # Buat file test
        test_file = os.path.join(self.temp_dir, 'test.txt')
        with open(test_file, 'w') as f:
            f.write('Test content')
        
        info = self.processor.get_file_info(test_file)
        
        self.assertIn('size', info)
        self.assertIn('size_mb', info)
        self.assertIn('modified', info)
        self.assertGreater(info['size'], 0)
    
    def test_cleanup_temp_files(self):
        """Test cleanup_temp_files method"""
        # Buat file temporary
        temp_file = os.path.join(self.temp_dir, 'temp_file.txt')
        with open(temp_file, 'w') as f:
            f.write('Temp content')
        
        # Test cleanup
        self.processor.cleanup_temp_files()
        
        # File seharusnya masih ada karena bukan di temp_dir asli
        self.assertTrue(os.path.exists(temp_file))

class TestDatabase(unittest.TestCase):
    """Test cases untuk Database"""
    
    def setUp(self):
        """Setup test database"""
        self.db_path = tempfile.mktemp(suffix='.db')
        self.db = Database(self.db_path)
    
    def tearDown(self):
        """Cleanup test database"""
        if os.path.exists(self.db_path):
            os.remove(self.db_path)
    
    def test_add_user(self):
        """Test add_user method"""
        user_id = 12345
        username = 'test_user'
        first_name = 'Test'
        last_name = 'User'
        
        self.db.add_user(user_id, username, first_name, last_name)
        
        # Test user exists
        stats = self.db.get_user_stats(user_id)
        self.assertIsInstance(stats, dict)
    
    def test_add_conversion(self):
        """Test add_conversion method"""
        user_id = 12345
        original_file = 'test.pdf'
        converted_file = 'test.docx'
        conversion_type = 'pdf-to-word'
        file_size = 1024
        
        self.db.add_conversion(
            user_id, original_file, converted_file, 
            conversion_type, file_size
        )
        
        # Test conversion recorded
        stats = self.db.get_user_stats(user_id)
        self.assertEqual(stats['total_conversions'], 1)
    
    def test_get_bot_stats(self):
        """Test get_bot_stats method"""
        stats = self.db.get_bot_stats()
        
        self.assertIn('total_users', stats)
        self.assertIn('total_files', stats)
        self.assertIn('total_size_mb', stats)
        self.assertIn('daily_conversions', stats)
        self.assertIn('top_conversions', stats)
    
    def test_get_recent_activity(self):
        """Test get_recent_activity method"""
        # Add test data
        self.db.add_user(12345, 'test_user', 'Test', 'User')
        self.db.add_conversion(
            12345, 'test.pdf', 'test.docx', 
            'pdf-to-word', 1024
        )
        
        activity = self.db.get_recent_activity(limit=5)
        
        self.assertIsInstance(activity, list)
        if activity:
            self.assertIn('username', activity[0])
            self.assertIn('file', activity[0])
            self.assertIn('type', activity[0])
            self.assertIn('time', activity[0])

class TestIntegration(unittest.TestCase):
    """Integration tests"""
    
    def setUp(self):
        """Setup integration test"""
        self.temp_dir = tempfile.mkdtemp()
        self.db_path = os.path.join(self.temp_dir, 'test.db')
        self.db = Database(self.db_path)
        self.processor = FileProcessor()
        self.processor.temp_dir = self.temp_dir
        self.processor.output_dir = os.path.join(self.temp_dir, 'output')
        os.makedirs(self.processor.output_dir, exist_ok=True)
    
    def tearDown(self):
        """Cleanup integration test"""
        shutil.rmtree(self.temp_dir)
    
    def test_full_conversion_workflow(self):
        """Test complete conversion workflow"""
        # Add user
        user_id = 12345
        self.db.add_user(user_id, 'test_user', 'Test', 'User')
        
        # Create test file
        test_file = os.path.join(self.temp_dir, 'test.txt')
        with open(test_file, 'w') as f:
            f.write('Test content for conversion')
        
        # Get file info
        file_info = self.processor.get_file_info(test_file)
        
        # Record conversion
        self.db.add_conversion(
            user_id, 'test.txt', 'test_converted.txt',
            'text-to-pdf', file_info['size']
        )
        
        # Verify stats
        stats = self.db.get_bot_stats()
        self.assertEqual(stats['total_files'], 1)
        
        user_stats = self.db.get_user_stats(user_id)
        self.assertEqual(user_stats['total_conversions'], 1)

def run_tests():
    """Run all tests"""
    print("🧪 Running Telegram Bot Tests...")
    
    # Create test suite
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    
    # Add test cases
    suite.addTests(loader.loadTestsFromTestCase(TestFileProcessor))
    suite.addTests(loader.loadTestsFromTestCase(TestDatabase))
    suite.addTests(loader.loadTestsFromTestCase(TestIntegration))
    
    # Run tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Print results
    if result.wasSuccessful():
        print("✅ All tests passed!")
        return 0
    else:
        print(f"❌ {len(result.failures)} test(s) failed")
        print(f"❌ {len(result.errors)} error(s) occurred")
        return 1

if __name__ == '__main__':
    exit_code = run_tests()
    sys.exit(exit_code)
