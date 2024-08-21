#!/usr/bin/env python3
"""LRU Caching"""

from base_caching import BaseCaching


class LRUCache(BaseCaching):
    def __init__(self):
        """initialize the LRUCache class"""
        super().__init__()

    def put(self, key, item):
        """Assign the item value to the dictionary self.cache_data with the key key."""
        if key is not None and item is not None:
            if key in self.cache_data:
                del self.cache_data[key]
            self.cache_data[key] = item

            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                first_key = next(iter(self.cache_data))
                print(f"DISCARD: {first_key}")
                self.cache_data.pop(first_key)

    def get(self, key):
        """Return the value in self.cache_data linked to key."""
        if key is not None and key in self.cache_data:
            value = self.cache_data.pop(key)
            self.cache_data[key] = value
            return value
        return None
