import React, { useEffect, useState, useContext } from "react";
import { Table, Button,Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Loader from 'react-loader-spinner'
import PaginationCustom from "../../components/pagination";
import FormComponent from "../../components/form-component/index";
import BlockHeader from "../../components/block-header/index";
import chartImage from "../../assets/images/chart.png";
import { callApi } from "../../api/API";
import "./Deal-details.css";
import moment from 'moment'
import { Link } from "react-router-dom";
import { hi, tr } from "date-fns/locale";
import EditDeal from "../../components/edit-deal";
import CheckboxContainer from "../../components/checkbox-container";
import UserContext from "../../contexts/userContext";
import { _empty } from "../../utils/utils";

const DealDetails = ({ location }) => {
  const [edit, setEdit] = useState(!!location.search.includes("edit"));
  const [page, setPage] = useState(false);
  const [formclicked, setFormclicked] = useState(false);
  const [dealData, setDealData] = useState(null);
  const [boughtList, setBoughtList] = useState([])
  const [loadingBoughtList, setLoadingBought] = useState(false)
  const [loadBoughtErr, setLoadBoughtErr] = useState(false)
  const [ifDealBought,setIfDealBought] = useState(false);
  const [show, setShow] = useState(false);
  const [currentRecordId,setCurrentRecordId] = useState();
  const [currentEmail,setCurrentEmail] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pageSize = 5

  const data = {
    dealName: "Largest Summer Cyber Monday Sale",
    servicePicture: "profil_image.png",
    originalPrice: "$500.00",
    discountedPrice: "$300.00",
    dealStartDate: "06/13/2020",
    dealEndDate: "06/13/2020",
    dealPublishDate: "06/13/2020",
    dealDescription: "Cheaper Than Black Friday iMac + Free 2 Day Shipping",
  };
  const [dealid, setDealid] = useState("0");
  const history = useHistory();
  const { userData, } = useContext(UserContext);


  const getPurchaserList =  async(dealId) => {
    setLoadingBought(true)
    const boughtStatus = true;//await callApi(`/coupons/dealboughtdetails/${dealId}`,"GET",null, "Bearer " + userData.token );
    axios.get(process.env.REACT_APP_BASEURL+`/coupons/dealboughtdetails/${dealId}`)
    .then((res)=>{
      console.log("status is")
      console.log(res.status);
      if(res.status===200 || res.status === 304){
        console.log("inside status")
        setLoadingBought(false);
        setLoadBoughtErr(false);
        setIfDealBought(true);
        console.log(res.data);
        setBoughtList(res.data);
      }
      else if(boughtStatus.status === 404){
         setLoadingBought(false)
          setBoughtList([])
      }
    })
    .catch((err)=>{
      setLoadingBought(false)
      setBoughtList([])
    });
  }

  const redeemDeal  = async (recordId, email) => {
        setCurrentEmail(email);
        setCurrentRecordId(recordId);
        handleShow();  
  }
  const redeemDealNew = async () => {
    const redeem =  await callApi('/coupons/updatedealboughtstatus/', "PUT", {
      email: currentEmail,
      recordid: currentRecordId
    }, "Bearer " + userData.token);
    if(redeem){
      handleClose();
      getPurchaserList(dealData?._id)
    }else{
      handleClose();
      setLoadingBought(false)
        setLoadBoughtErr(true)
    }
  }
  const cancelButtonClick = () => {
    document.getElementById(currentRecordId).checked = false;
    handleClose();
  }
  useEffect(() => {
    if (dealData) {
      getPurchaserList(dealData?._id)
    }
  }, [dealData])

  useEffect(() => {
    if (history.location.state) {
      setDealData(history.location?.state?.detail);
    }
  }, []);

  const shareDealPage = () => {
    var name = dealData.name.replace('%', 'percent');
    name = name.split(' ');
    var newName = '';
    for (var i = 0; i < name.length; i++){
        newName = newName + '-' + name[i];
    }
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.target = '_self';
    form.method = 'post';
    form.action = process.env.REACT_APP_BASEURL + '/businessinfo/deal/' + dealData._id + newName;
    
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'email';
    input.value = sessionStorage.getItem('uname');
    form.appendChild(input);
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'id';
    input.value = dealData._id;
    form.appendChild(input);
    
    form.submit();
    document.body.removeChild(form);
}

  return (
    <div className="col-12">
      <div className="d-flex flex-wrap bg-white deal-details overflow-hidden w-100">
        <div className="w-100 main-header d-flex align-items-center">
          <Link to="/business-home" className="back text-decoration-none">
            <i className="icon-angle-left" />
            Home
          </Link>
          {dealData && (
            <BlockHeader
              title={dealData?.name}
              buttonText="Share deal"
              buttonIcon="icon-share-square"
              handler={shareDealPage}
            />
          )}
        </div>
        <section className="col-md-6 p-0">
          
          <EditDeal dealbought={ifDealBought} data={dealData} setData={setDealData}  />
          {/* <div className="deal-details__header">
            <BlockHeader title="Sales Summary" />
          </div> */}
          {/* <div className="total-container">
            <div className="total-block">
              <p className="total-block__title m-0">Total sales</p>
              <h2 className="total-block__count m-0">30</h2>
            </div>
            <div className="total-block">
              <p className="total-block__title m-0">Total revenue</p>
              <h2 className="total-block__count m-0">$15,000</h2>
            </div>

            <div className="total-block">
              <p className="total-block__title m-0">Invites Sent</p>
              <h2 className="total-block__count m-0">2,400</h2>
            </div>
            <div className="total-block">
              <p className="total-block__title m-0">Views</p>
              <h2 className="total-block__count m-0">5,043</h2>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between select-container">
            <div className="d-flex align-items-center">
              <p className="m-0 showing-label">Showing for: </p>
              <FormControl>
                <Select
                  labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  value={10}
                >
                  <MenuItem value={10}>
                    {" "}
                    calendar 30 June - 5 August 2020 angle-down
                  </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <p className="sales d-flex align-items-center m0">Sales</p>
          </div>
          <div className="chart-container">
          </div> */}
        </section>

      <Modal show={show} onHide={cancelButtonClick}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm ? </Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure you want to redeem this customers deal ? </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={redeemDealNew}>
            Yes
          </Button>
          <Button variant="secondary" onClick={cancelButtonClick}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
        <section className="table-block col-md-6 p-0 d-flex flex-column">
          <div className="deal-details__header">
            <BlockHeader title="Customers that purchased this deal" />
          </div>
          <div className="flex-grow-1 deal-table-container h-100">
            {
              loadingBoughtList &&  <div className="text-center" style={{color: 'red'}}>
              <h5>Problem loading purchase list</h5>
              <Button onClick={() => getPurchaserList(dealData?._id)}>Retry</Button>
            </div>
            }
            {
              !loadingBoughtList && !loadBoughtErr && <Table responsive className="deal-table border-0 m-0">
              <thead></thead>
              <tbody>
                {
                  (boughtList?.length === 0) &&  <div className="text-center" >
                  <h5>No purchase for this deal</h5>
                </div>
                }
                {
                  boughtList && boughtList?.length > 0 &&
                  boughtList
                  .slice((currentPage - 1) * pageSize, pageSize * currentPage)
                  .map(bought => {
                    return (
                  <tr>
                    <td className="align-middle text-truncate ">
                      {moment(bought?.purchasetime).format('MM/DD/YYYY hh:mm')}
                    </td>
                    <td className="align-middle ">
                      <a
                        href=""
                        className="d-flex align-items-center user text-decoration-none text-truncate bold-text"
                      >
                        <figure className="rounded-circle overflow-hidden m-0 user__image flex-shrink-0 d-flex align-items-center justify-content-center">
                          {/*<img className="thumbnail-image img-fluid w-100 h-100"*/}
                          {/*alt="user pic"*/}
                          {/*/>*/}
                          <i className="icon-user" />
                        </figure>
                        <span className="user__name">{bought?.fname} {bought?.lname}</span>
                      </a>
                    </td>
                    {/* <td className="align-middle text-truncate">
                      {bought?.phonenumber}
                    </td> */}
                    <td className="align-middle text-truncate">
                      {bought?.email}
                    </td>
                    <td>
                      <CheckboxContainer status={bought?.status} redeemdate={bought?.reedemdate} checkboxid={bought?.recordid} labetText="Redeem" change={(e) => {redeemDeal(bought?.recordid, bought?.email)}} />
                    </td>
                    {/* <td>
                      <CheckboxContainer labetText="Confirm Redeem" change={() => {}} />
                    </td> */}
                </tr>
                    )
                  })
                }
                {
                 !loadingBoughtList && loadBoughtErr && <div className="text-center" style={{color: 'red'}}>
                    <h5>Problem loading purchase list</h5>
                    <Button onClick={() => getPurchaserList(dealData?._id)}>Retry</Button>
                  </div>
                }
              </tbody>
            </Table>
            }
          </div>
          <div className="deal-details__footer d-flex justify-content-end">
            <PaginationCustom
              totalSize={boughtList.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={5}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DealDetails;
