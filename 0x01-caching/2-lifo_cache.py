#!/usr/bin/env python3
"""FIFO caching"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """inherits from BaseCaching and is a caching system"""

    def __init__(self):
        """Initialize the FIFOCache class"""
        super().__init__()

    def put(self, key, item):
        """assign to the dictionary self.cache_data the item value"""
        if key is not None and item is not None:
            if key in self.cache_data:
                del self.cache_data[key]
            
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                last_key = next(reversed(self.cache_data))
                print(f"DISCARD: {last_key}")
                self.cache_data.pop(last_key)
        self.cache_data[key] = item

    def get(self, key):
        """Return the value in self.cache_data linked to key."""
        return self.cache_data.get(key, None)
