interface AuthInterface {
  children: React.ReactNode;
}
const AuthFormWrapper = (props: AuthInterface) => {
  return <div>{props.children}</div>;
};


export default AuthFormWrapper;