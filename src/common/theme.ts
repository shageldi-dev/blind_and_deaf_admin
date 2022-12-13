import {createTheme} from "@mui/material";

export const Fonts = {
    OpenSansBold:'OpenSans-Bold',
    OpenSansExtraBold:'OpenSans-ExtraBold',
    OpenSansLight:'OpenSans-Light',
    OpenSansMedium:'OpenSans-Medium',
    OpenSansRegular:'OpenSans-Regular',
    OpenSansSemiBold:'OpenSans-SemiBold',
    RalewayBlack:'Raleway-Black',
    RalewayBold:'Raleway-Bold',
    RalewayExtraBold:'Raleway-ExtraBold',
    RalewayExtraLight:'Raleway-ExtraLight',
    RalewayLight:'Raleway-Light',
    RalewayMedium:'Raleway-Medium',
    RalewaySemiBold:'Raleway-SemiBold',
    RalewayThin:'Raleway-Thin',
    RobotoBlack:'Roboto-Black',
    RobotoBold:'Roboto-Bold',
    RobotoLight:'Roboto-Light',
    RobotoMedium:'Roboto-Medium',
    RobotoRegular:'Roboto-Regular',
    RobotoThin:'Roboto-Thin'
}

export const colors = {
    dark: "#051E34",
    primary: "#1A73E8",
    white: "#FFFFFF",
    black: "#000000"
}

const theme = createTheme(
    {
        typography: {
            fontFamily: Fonts.RobotoRegular,
        },
        palette: {
            mode: "light",
            primary: {
                light: "#69a1ff",
                main: "#1A73E8",
                dark: "#0049b5"
            },
            secondary: {
                main: "#051E34",
                light: "#31455e",
                dark: "#00000e"
            }
        }
    }
);


export const ImageStyle={
    width:'100px',
    height:'100px'
}





export default theme;