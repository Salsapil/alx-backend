#!/usr/bin/env python3
"""MRU Caching"""

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    def __init__(self):
        """Initialize the MRUCache class"""
        super().__init__()
        self.access_order = []  # To track the access order of keys

    def put(self, key, item):
        """Assign the item value to the dictionary self.cache_data"""
        if key is not None and item is not None:
            if key in self.cache_data:
                self.access_order.remove(key)
            elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Cache is full, remove the most recently used item
                # Most recently used key is the last one
                mru_key = self.access_order.pop()
                del self.cache_data[mru_key]
                print(f"DISCARD: {mru_key}")

            # Add the new key-value pair and update the access order
            self.cache_data[key] = item
            self.access_order.append(key)

    def get(self, key):
        """Return the value in self.cache_data linked to key."""
        if key is None or key not in self.cache_data:
            return None

        # Move the accessed key to the end to mark it as most recently used
        self.access_order.remove(key)
        self.access_order.append(key)
        return self.cache_data[key]
