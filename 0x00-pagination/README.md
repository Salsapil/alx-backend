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