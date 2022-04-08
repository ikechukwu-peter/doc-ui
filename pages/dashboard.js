import { useEffect, useState, useCallback } from "react";
import withAuth from "../utils/withAuth.js";
import DashboardPage from "../components/Dashboard.js";
import axios from 'axios'
import cogoToast from 'cogo-toast'
import jwtDecode from "jwt-decode";


const Dashboard = () => {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(false)

  //Decode jwt token from localstorage
  const decoded = jwtDecode(localStorage.getItem('token'))

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token')
    try {
      console.log(token)
      setLoading(true)
      let docs = await axios({
        method: "GET",
        url: `https://docbran.herokuapp.com/doc/docs`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (docs) {
        setDocs(docs.data.data)
        console.log(docs)
      }
    } catch (error) {
      console.log(error)
      let errorResponse = error.response.data ? error.response.data.error : "Check your internet connection"
      const { hide, hideAfter } = cogoToast.error(`${errorResponse}`, {
        onClick: () => {
          hide();
        },
        hideAfter: 3
      });
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {

    fetchData()

  }, [fetchData])


  return (
    <>
      {decoded.username ? <DashboardPage user={decoded.username} docs={docs} /> : null}
    </>
  );
};

export default withAuth(Dashboard);
