
import React, {useState} from 'react';
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";
import { Fab } from "native-base";
import * as PropTypes from "prop-types";


Center.propTypes = {children: PropTypes.node};
let App = () => {

    return (
        <>
            {/*<Home />*/}
            {/*<Profile />*/}

            <Box alignItems="center">
                <Input mx="3" placeholder="Input" w="75%" maxWidth="300px" />
            </Box>

        </>

    );
}

export default App;

