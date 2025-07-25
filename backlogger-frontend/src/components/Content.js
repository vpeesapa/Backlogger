import axios from 'axios';
import * as React from 'react';

function Content(props) {
    const [displayData,setDisplayData] = React.useState([]);

    React.useEffect(() => {
        fetchData();
    },[]);

    const fetchData = () => {
        axios.get("http://localhost:8090/games_by_platform")
            .then(response => {
                console.log(response.data);
                
                setDisplayData(response.data);
            }).catch(e => {
                console.error(e);
            });
    };

    return (
        <>
            {JSON.stringify(displayData,null,4)}
        </>
    );
}

export default Content;