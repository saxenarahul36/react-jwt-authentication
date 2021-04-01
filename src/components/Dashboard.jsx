import React, { useEffect } from "react";
import useAsync from "../hooks/useAsync";
import useApi from "../services/api/user.service";
const Dhashboard = () => {
  const { data = [], error, loading, fetcher } = useAsync("/api/alluser");

  useEffect(() => {
    fetcher(async () => {
      try {
        const data = await useApi.getAllUserList();
        return data;
      } catch (error) {
        if (error?.response?.status === 401) {
          return [];
        }
      } finally {
        //console.log("We do cleanup here");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapData = (item, i) => {
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.roles.join(",")}</td>
      </tr>
    );
  };
  return (
    <>
      <h3>Welcome to User Dashboard page</h3>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>username</th>
            <th>email</th>
            <th>roles</th>
          </tr>
        </thead>
        <tbody>
          {loading ? "loading...." : data && data.data?.map(mapData)}
        </tbody>
      </table>
    </>
  );
};
export default Dhashboard;
