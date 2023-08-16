import {ChakraProvider} from '@chakra-ui/react'
import MainContent from "./components/MainContent.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./config";

function App() {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <MainContent/>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ChakraProvider>
    );
}

export default App;