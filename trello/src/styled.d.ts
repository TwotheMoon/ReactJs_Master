import "styled-components";

// styled-components 테마 정의
declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        boardColor: string;
        cardColor: string;
    }
}