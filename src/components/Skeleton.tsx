import {Box, Flex, Icon, Skeleton} from "@chakra-ui/react";
import {FiStar} from "react-icons/fi";

const SkeletonCard = ({count = 15}) => {
    return (
        <Flex
            p={6}
            gap={4}
            flexWrap={'wrap'}
            justifyContent="space-between"
            alignItems="center"
        >
            {Array.from({length: count}).map((_, i) => (
                    <Box
                        key={i}
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        w={{base: 'full', md: '380px'}}
                        h={{base: 'full', md: '580px'}}
                        bg={'gray.100'}
                        rounded="xl"
                        shadow="lg"
                    >
                        <Skeleton height="300px" width="100%"/>
                        <Box p="6">
                            <Flex mt="1" justifyContent="center" alignContent="center">
                                <Box
                                    fontSize="2xl"
                                    fontWeight="semibold"
                                    as="h4"
                                    lineHeight="tight"
                                    isTruncated>
                                    <Skeleton height="20px" width="100px"/>
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
                                {Array.from(Array(3).keys()).map((i) => (
                                    <Skeleton key={i} height="20px" width="300px"/>
                                ))}
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
                                <Skeleton height="20px" width="100px"/>
                            </Flex>
                            <Skeleton height="20px" width="100px"/>

                        </Flex>
                    </Box>
                ))
            }
        </Flex>
    );
};

export default SkeletonCard;