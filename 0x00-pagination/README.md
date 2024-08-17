# Pagination
Pagination is the process of dividing a dataset into smaller chunks (pages). This is useful when dealing with large amounts of data, making it easier to browse through it in manageable parts.   
- Page Size: The number of items that should be displayed on a single page.   

## 1. Paginating a Dataset with Simple page and page_size Parameters   
**Concept:**   
- break down the dataset into pages where each page contains a fixed number of items.   

**Steps:**   
**1- Calculate Indices:** Use the "index_range" function to determine the start and end indices based on the current page and page_size.   
**2- Extract the Data:** Slice the dataset using the calculated indices.    

**Example:**
```python
def index_range(page, page_size):
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)

def paginate_dataset(dataset, page, page_size):
    start, end = index_range(page, page_size)
    return dataset[start:end]
```   

## 2. Paginating a Dataset with Hypermedia Metadata
**Concept:**
- Hypermedia-driven APIs often include additional metadata with pagination results, such as the total number of items, number of pages, and links to the next and previous pages.   

**Steps:**   
**1- Calculate Pagination Metadata:** In addition to slicing the dataset, you also calculate total items, total pages, and whether there are previous or next pages.   
**2- Construct Response:** Include the paginated dataset along with metadata.   

**Example:**   
```python
import math

def paginate_with_metadata(dataset, page, page_size):
    start, end = index_range(page, page_size)
    paginated_data = dataset[start:end]
    
    total_items = len(dataset)
    total_pages = math.ceil(total_items / page_size)
    
    metadata = {
        'page': page,
        'page_size': page_size,
        'total_items': total_items,
        'total_pages': total_pages,
        'has_next': page < total_pages,
        'has_previous': page > 1,
    }
    
    return {
        'data': paginated_data,
        'metadata': metadata
    }
```   
## 3. Paginating in a Deletion-Resilient Manner
**Concept:**   
- When paginating a dataset where items might be deleted, you need a mechanism to ensure that pagination remains consistent and doesn't skip or repeat items.   

**Steps:**   
**Use Stable Identifiers:** Instead of relying on indices, use a stable identifier like a timestamp or a unique ID to paginate.   
**Offset with ID:** When fetching data, use a “last-seen” ID to fetch the next set of items.   

**Example:**   

```python
def paginate_resilient(dataset, page, page_size):
    # Assuming `dataset` is a list of dictionaries with a unique 'id' field
    sorted_dataset = sorted(dataset, key=lambda x: x['id'])  # Sort by id
    start, end = index_range(page, page_size)
    return sorted_dataset[start:end]
```   
