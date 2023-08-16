import {useState} from 'react';
import {search} from '../services/search';
import ProfileCard from "./ProfileCard.tsx";
import Footer from "./Footer.tsx";
import {SearchQuerySettings, User} from "../services/search/types.ts";
import {Text, Button, Flex, Input, Box} from "@chakra-ui/react";
import {useDebounce} from "../hooks";
import {useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import SkeletonCard from "./Skeleton.tsx";

const MainContent = () => {
    const [query, setQuery] = useState('');
    const debouncedValue = useDebounce<string>(query, 500)
    const searchQuerySettings = {
        startIndex: 0,
        maxResults: 20,
    } as SearchQuerySettings;
    const {isLoading, error, data, refetch} =
        useQuery<User[], AxiosError>(['search', debouncedValue],
            () => search({
            ...searchQuerySettings,
            terms: query,
        })
    );
    const handleSearchClick = () => {
        refetch();
    };

    return (
        <Box>
            <Flex
                p={10}
                gap={2}
                w="full" alignItems="center" justifyContent="center"
            >
                <Input maxW={'500px'} value={query} onChange={(e) => setQuery(e.target.value)}/>
                <Button onClick={handleSearchClick}>Search</Button>
            </Flex>

            {isLoading ? (

                   <SkeletonCard   />
                ) :
                <Flex
                    p={6}
                    gap={4}
                    flexWrap={'wrap'}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {data && data.map((user) => <ProfileCard key={user.id} user={user}/>)}
                </Flex>
            }
            {error && <Text>Error: {error.message || 'An error occurred'}</Text>}
            <Footer/>
        </Box>
    );
};

export default MainContent;