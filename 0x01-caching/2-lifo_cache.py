#!/usr/bin/env python3
"""FIFO caching"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """inherits from BaseCaching and is a caching system"""

    def __init__(self):
        """Initialize the FIFOCache class"""
        super().__init__()
        self.stack = []  # keep track of insertion order

    def put(self, key, item):
        """assign to the dictionary self.cache_data the item value"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.stack.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Remove the most recently added item
            last_key = self.stack.pop()
            del self.cache_data[last_key]
            print(f"DISCARD: {last_key}")

        self.cache_data[key] = item
        self.stack.append(key)

    def get(self, key):
        """Return the value in self.cache_data linked to key."""
        return self.cache_data.get(key, None)
