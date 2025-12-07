import * as React from 'react';
import { Box, Stack, TextField } from '@mui/material';
import GamesContent from './GamesContent';
import { fetchSearchGameService } from '../services/ApiService';

function SearchContent(props) {
    const {
        handleCurrentPageData,
        handleSearchQuery,
        ref
    } = props;

    const [query,setQuery] = React.useState("");
    const [searchResults,setSearchResults] = React.useState([]);
    const [displayResults,setDisplayResults] = React.useState(false);

    React.useEffect(() => {
        ref.current = {
            searchGame
        };
    },[ref]);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);

        if(event.target.value.trim() === "") {
            return;
        }

        handleSearchQuery(event.target.value);

        searchGame(event.target.value);
    };

    const searchGame = (query) => {
        fetchSearchGameService(query)
            .then(responseData => {
                setSearchResults(responseData.matches);
                setDisplayResults(true);
            }).catch(e => {
                console.error(e);
            });
    };

    return (
        <Box
            maxWidth
            sx={{
                width: '100%',
                paddingY: 2
            }}
        >
            <Stack spacing={2} sx={{ width: '100%',alignItems: 'center' }}>    
                <TextField
                    placeholder="Search..."
                    value={query}
                    onChange={handleQueryChange}
                    sx={{
                        width: '60%'
                    }}
                />
                {
                    displayResults ? (
                        searchResults.length > 0 ? (
                            <GamesContent displayData={searchResults} handleCurrentPageData={handleCurrentPageData} />
                        ) : (
                            <p><strong>No matches found for the query: {query}</strong></p>
                        )
                    ) : null
                }
            </Stack>
        </Box>
    );
}

export default SearchContent;