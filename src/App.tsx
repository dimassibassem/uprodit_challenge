import {ChakraProvider} from '@chakra-ui/react'
import MainContent from "./components/MainContent.tsx";

function App() {
    return (
        <ChakraProvider>
            <MainContent/>
        </ChakraProvider>
    );
}

export default App;