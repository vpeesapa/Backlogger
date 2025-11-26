from core.data_cache import DataCache

def fetch_search_matches(query: str):
    return DataCache.search_master_list(query)