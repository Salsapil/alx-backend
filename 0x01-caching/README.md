# Caching System Concepts

## What is a Caching System?
A caching system is a mechanism used to store copies of data or computations that can be quickly retrieved when needed. This reduces the time it takes to access data, enhances performance, and reduces the load on the main data source.

## What FIFO Means
**FIFO** stands for **First-In, First-Out**. In the context of caching, it means that the first item added to the cache will be the first one to be removed when the cache reaches its maximum capacity.

## What LIFO Means
**LIFO** stands for **Last-In, First-Out**. In caching, this means that the most recently added item will be the first to be removed when the cache exceeds its limit.

## What LRU Means
**LRU** stands for **Least Recently Used**. It refers to a caching strategy where the least recently accessed item is the first to be removed when the cache needs to free up space.

## What MRU Means
**MRU** stands for **Most Recently Used**. This caching strategy discards the most recently accessed item first when the cache is full.

## What LFU Means
**LFU** stands for **Least Frequently Used**. In this strategy, the item with the lowest access frequency is removed first when the cache reaches its maximum size.

## What is the Purpose of a Caching System?
The primary purpose of a caching system is to improve the performance of applications by reducing the time it takes to access frequently used data. It does this by storing copies of data or results closer to the application or user.

## What Limits a Caching System Have?
Caching systems have several limitations, including:
- **Capacity Limit**: Caches have limited storage capacity, so not all data can be cached.
- **Consistency**: Cached data may become stale if the original data changes and the cache is not updated.
- **Eviction Policies**: Different caching strategies determine how data is evicted from the cache when it reaches capacity, which can impact performance.
