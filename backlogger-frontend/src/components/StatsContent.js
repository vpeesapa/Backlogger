import { PieChart } from "@mui/x-charts";
import * as React from "react";

function StatsContent(props) {
    const {
        displayData
    } = props;

    const [processedData,setProcessedData] = React.useState([]);

    React.useEffect(() => {
        setProcessedData([]);

        Object.keys(displayData).map((key,index) => {
            setProcessedData(oldData => [
                ...oldData,
                {
                    id: index,
                    value: displayData[key],
                    label: key
                }
            ]);

            return 0;
        });
    },[displayData]);

    return (
        <PieChart
            width={700}
            height={400}
            series={[
                {
                    data: processedData
                }
            ]}

            sx={{
                paddingTop: 2
            }}
        />
    );
}

export default StatsContent;