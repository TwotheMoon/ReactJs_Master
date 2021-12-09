import "styled-components";

// styled-components 테마 정의
declare module "styled-components" {
    export interface DefaultTheme {
        textColor: string;
        bgColor: string;
        accentColor: string;
    }
}