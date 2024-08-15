import { Box, Container } from "@mui/material";
import * as Clerk from "@clerk/nextjs";
export default function SignInPage(){

    return(
        <div className="flex justify-center items-center mt-20">
            <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            >
                <Clerk.SignIn/>
            </Box>
        </div>
    )
}