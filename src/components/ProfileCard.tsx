import {FC, useEffect, useRef} from 'react';
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
import {useQuery} from "@tanstack/react-query";
import {useIntersectionObserver} from "../hooks";

const ProfileCard: FC<{ user: User }> = ({user}) => {
    const url = `https://www.uprodit.com/profile/personal/${user.id}`;
    const ref = useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(ref, {})
    const isVisible = !!entry?.isIntersecting
    const {data: image,refetch} = useQuery(['image', user.image_id],
        () => getImage(user.image_id),
    {
            enabled: false, // Disable initial fetch
        });
    const imageData = image ? `data:image/png;base64,${image.b64Content}` : '';
    useEffect(() => {
        if (isVisible) {
            refetch(); // Fetch image data when component is in view
        }
    }, [isVisible, refetch]);

    return (
        <>
            <Box
                ref={ref}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w={{base: 'full', md: '380px'}}
                h={{base: 'full', md: '580px'}}
                bg={'gray.100'}
                rounded="xl"
                shadow="lg"
            >
                {isVisible && <Image src={imageData} w={'full'} h={'300px'} alt={user.denomination}
                                     fallbackSrc="https://via.placeholder.com/300" roundedTop="xl" borderRadius={10}/>}
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

