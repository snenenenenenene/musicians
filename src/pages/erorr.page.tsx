export const Error = ({ message }: { message: string }) => {
  return (
    <>
      <p>
        Something Went Wrong!: <b>{message}</b>
      </p>
    </>
  );
};
