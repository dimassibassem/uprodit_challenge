import {useState, useEffect} from 'react';
import {search} from '../services/search';
import ProfileCard from "./ProfileCard.tsx";
import Footer from "./Footer.tsx";
import {SearchQuerySettings, User} from "../services/search/types.ts";
import {Text, Button, Flex, Input, Box} from "@chakra-ui/react";
import {useDebounce} from "../hooks";

const MainContent = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const debouncedValue = useDebounce<string>(query, 500)
    const searchQuerySettings = {
        startIndex: 0,
        maxResults: 20,
    } as SearchQuerySettings;

    useEffect(() => {
        setIsLoading(true);
        if (debouncedValue) {
            setUsers([])
            search({
                ...searchQuerySettings,
                terms: query,
            }).then((users) => {
                console.log(users);
                setUsers(users)
                setIsLoading(false);
            })
        }
    }, [debouncedValue, query])

    const fetchUsers = async () => {
        setIsLoading(true);
        const users = await search();
        setUsers(users);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchUsers()
    }, []);

    const onSearchClick = async () => {
        setIsLoading(true);
        const searchedUsers = await search({
            ...searchQuerySettings,
            terms: query,
        });
        setUsers(searchedUsers);
        setIsLoading(false);
    };
    console.log(isLoading);
    return (
        <Box>
            <Flex
                p={10}
                gap={2}
                w="full" alignItems="center" justifyContent="center"
            >
                <Input maxW={'500px'} value={query} onChange={(e) => setQuery(e.target.value)}/>
                <Button onClick={onSearchClick}>Search</Button>
            </Flex>

            {isLoading ? (
                    <Text>Loading...</Text>
                ) :
                <Flex
                    p={6}
                    gap={4}
                    flexWrap={'wrap'}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {users && users.map((user) => <ProfileCard key={user.id} user={user}/>)}
                </Flex>
            }
            <Footer/>
        </Box>
    );
};

export default MainContent;