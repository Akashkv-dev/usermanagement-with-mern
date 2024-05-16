import axios from "axios";
import React, {  useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type apidata ={
    urlToImage:string;
    title:string;
    description:string;
}

export const News = () => {
  const [data, setData] = useState<apidata[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = React.useState(1);
  const itemsPerPage=12;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=tesla&from=2024-04-21&sortBy=publishedAt&apiKey=076d7b45974d46f7bb6d6f8350922237&page=${page}&pageSize=${itemsPerPage}`
        );
        console.log(response);
        setData(response.data.articles);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((item,index) => (
        <div className="m-2" key={index}>
            <Card  sx={{ maxWidth: 385, maxHeight:400 }}>
          <CardActionArea >
            <CardMedia
              component="img"
              height="140"
              image={item.urlToImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" >
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" >
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </div> 
      ))}
      
      <Stack spacing={2}>
      <Pagination count={10} size="large" 
      sx={{ '& .MuiPaginationItem-root': { color: 'white' } }}
      page={page}
      onChange={handleChange}
      />
    </Stack>
      
    </div>
  );
};
