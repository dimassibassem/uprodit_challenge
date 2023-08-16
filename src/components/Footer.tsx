import {
    Box,
    chakra,
    Container, Link,
    Stack,
    Text,
    Image,
    VisuallyHidden,
} from '@chakra-ui/react'
import {FaGithub, FaLinkedinIn} from 'react-icons/fa'
import uprodit from '../assets/uprodit.png'
import {ReactNode} from "react";
import {TbWorldWww} from "react-icons/tb";


const SocialButton = ({
                          children,
                          label,
                          href,
                      }: {
    children: ReactNode
    label: string
    href: string
}) => {
    return (
        <chakra.button
            bg={'blackAlpha.100'}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: 'blackAlpha.200'
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}

export default function Footer() {
    return (
        <Box
            bg={'gray.200'}
            color={'gray.700'}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                spacing={4}
                justify={'center'}
                align={'center'}>
                <Image
                    src={uprodit}
                     alt={'Uprodit'}
                h={14}
                />
                <Stack direction={'row'} spacing={6}>
                    <Link as="a" href={'https://doc.uprodit.com/'}>
                        Documentation
                    </Link>
                    <Link as="a" href={'https://www.uprodit.com/about'}>
                        About
                    </Link>
                    <Link as="a" href={'https://status.uprodit.com/'}>
                        Status
                    </Link>
                    <Link as="a" href={'https://www.uprodit.com/#contactez'}>
                        Contact
                    </Link>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={'solid'}
                borderColor={'gray.200'}>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>
                        © {new Date().getFullYear()} Uprodit Challenge.
                        All rights reserved
                    </Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Twitter'} href={'https://www.linkedin.com/in/dimassibassem/'}>
                            <FaLinkedinIn />
                        </SocialButton>
                        <SocialButton label={'Portfolio'} href={'www.dimassibassem.tech'}>
                            <TbWorldWww />
                        </SocialButton>
                        <SocialButton label={'Github'} href={'https://github.com/dimassibassem'}>
                            <FaGithub />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}