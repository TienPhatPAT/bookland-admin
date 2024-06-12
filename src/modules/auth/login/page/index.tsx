import { isLoggedAtom } from "@/store/auth";
import { globalLoaderAtom } from "@/store/common";
import { setAccessTokenToLS, setRefreshTokenToLS, setRoleAccountToLS } from "@/utils/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSetAtom } from "jotai";
import { useForm } from "react-hook-form";

import { Button, Stack } from "@mui/material";

import { APP_ROUTES } from "@/routers/routes";

import { ELogin, IFormLogin } from "@/models/auth";
import { NotifyService } from "@/helpers/notify";
import InputField from "@/components/form-control/input-field";
import Logo from "@/components/logo";

import authApi from "@/services/auth.api";

import { yupLogin } from "../schema";
import { StyledContainer, Title, Wrapper } from "./styles";

const Login = () => {
  const setIsLoggedIn = useSetAtom(isLoggedAtom);
  const setIsLoader = useSetAtom(globalLoaderAtom);

  const { control, handleSubmit } = useForm<IFormLogin>({
    resolver: yupResolver(yupLogin),
  });

  const handleLogin = async (value: IFormLogin) => {
    setIsLoader(true);
    authApi
      .login(value)
      .then((res) => {
        setIsLoggedIn(true);
        setAccessTokenToLS(res.data.tokens.accessToken);
        setRefreshTokenToLS(res.data.tokens.refreshToken);
        setRoleAccountToLS(res.data.admin.role);
        NotifyService.success(res.message);
      })
      .catch((e) => {
        NotifyService.error(e);
      })
      .finally(() => setIsLoader(false));
  };

  return (
    <Wrapper>
      <StyledContainer>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Stack>
            <Logo to={`${APP_ROUTES.LOGIN}`} />
            <Title>CMS Login</Title>
            <Stack gap={2}>
              <InputField
                name={ELogin.username}
                control={control}
                label="Username or email"
                placeholder="Username or email"
              />
              <InputField
                name={ELogin.password}
                control={control}
                label="Password"
                type="password"
                placeholder="Password"
              />
              <Stack flexDirection="row" justifyContent="flex-end" alignItems="center">
                <Button type="submit" variant="contained" sx={{ width: "147px" }}>
                  Login
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </StyledContainer>
    </Wrapper>
  );
};

export default Login;
