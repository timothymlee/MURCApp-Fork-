// Modified from https://github.com/alancting/react-cas-client-example/blob/main/cas-web-client/application/src/useCas.js
import { useContext, useEffect, useState } from "react";
//import CasClient, { constant } from "react-cas-client";

const useCas = () => {

/*
const [isLoading, setIsLoading] = useState(false);

const casClient = new CasClient("cas.messiah.edu", {
    version: constant.CAS_VERSION_3_0,
});

useEffect(() => {
    if (!casUserContext.user) {
        (async function () {
            try {
                await attemptCasLogin();
            } catch (error) {
                console.error(error);
            }
        })();
    }
}, []);

function attemptCasLogin() {
    return new Promise((resolve, reject) => {
        casClient
            .auth(gateway)
            .then((successRes) => {
                // Login user in state / locationStorage ()
                // eg. loginUser(response.user);
                casUserContext.setUser(successRes.user);
                // Update current path to trim any extra params in url
                // eg. this.props.history.replace(response.currentPath);
                setIsLoading(false);
                history.replace(successRes.currentPath);
            })
            .catch((errorRes) => {
                setIsLoading(false);
                history.replace(errorRes.currentPath);
                reject(errorRes);
            });
    });
}

function logout(path = "/") {
    casClient.logout("/");
}

return { isLoading, attemptCasLogin, logout };
*/
};
export default useCas;

