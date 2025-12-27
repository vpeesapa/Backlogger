import { Box } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import * as React from "react";

function StatsContent(props) {
    const {
        displayData,
        currentOption
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

        if(currentOption == "Scores") {
            setProcessedData(oldData => [...oldData].sort((a,b) => parseFloat(a.label) - parseFloat(b.label)));
        }
    },[displayData]);

    return (
        <Box display={"flex"} justifyContent={"center"}>
            {
                currentOption && currentOption !== "Scores" ? (
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
                ) : (
                    <BarChart
                        width={700}
                        height={400}
                        series={[
                            {
                                data: processedData.map((data) => data.value)
                            }
                        ]}
                        xAxis={[
                            {
                                scaleType: 'band',
                                data: processedData.map((data) => data.label)
                            }
                        ]}
                    />
                )
            }
        </Box>
    );
}

export default StatsContent;