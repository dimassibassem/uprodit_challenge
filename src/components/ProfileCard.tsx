import {useState, useEffect} from 'react';
import {getImage} from '../services/image';

import {FiStar} from 'react-icons/fi'
import {
    Box,
    Text,
    Link,
    Badge,
    Image,
    Flex, Icon,
} from '@chakra-ui/react'
import {User} from "../services/search/types.ts";

const ProfileCard = ({user}: { user: User }) => {
    const [imageData, setImageData] = useState('');
    useEffect(() => {
        const fetchImage = async () => {
            const image = await getImage(user.image_id);
            setImageData(`data:image/png;base64,${image.b64Content}`);
        };
        fetchImage();
    }, [user.image_id]);

    const url = `https://www.uprodit.com/profile/personal/${user.id}`;

    return (
        <>
            <Box
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w={{base: 'full', md: '380px'}}
                h={{base: 'full', md: '580px'}}
                bg={'gray.100'}
                rounded="xl"
                shadow="lg"
            >
                <Image src={imageData}
                       w={'full'}
                       h={'300px'}
                       alt={user.denomination}
                       fallbackSrc="https://via.placeholder.com/300"
                       roundedTop="xl"
                       borderRadius={10}
                />
                <Box p="6">
                    <Flex mt="1" justifyContent="center" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {user.denomination}
                        </Box>
                    </Flex>

                    <Flex
                        flexWrap={'wrap'}
                        w={'full'}
                        gap={2}
                        mt={2}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {user.specialities.map((speciality: string) => {
                                return (
                                    <Badge
                                        key={user.id + speciality}
                                        px={2}
                                        py={1}
                                        bg={'gray.200'}
                                        color={'blue.600'}
                                        fontWeight={'600'}>
                                        #{speciality}
                                    </Badge>
                                )
                            }
                        )}
                    </Flex>

                </Box>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w={'full'}
                    mt={6}
                    px={6}
                >

                    <Flex
                        justifyContent="center"
                        alignItems="center"

                        gap={1}
                        mt={2}
                    >
                        <Icon as={FiStar} h={5} w={5}/>
                        {user.stars_count}
                    </Flex>

                    <Link href={url} display={'flex'}>
                        <Text
                            fontSize={'1.2em'}
                            fontWeight={'bold'}
                        >
                            Visit Profile
                        </Text>
                    </Link>

                </Flex>
            </Box>
        </>
    );
};


export default ProfileCard;

