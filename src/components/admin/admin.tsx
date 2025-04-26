import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className=" card mt-5 text-center" style={{justifyContent: 'center',
      display: 'flex',flexDirection:"column",width:"400px"}}>
      <h2 className="mb-4">Admin Panel</h2>
      <div className="d-grid gap-3" style={{
    width: '200px',
    justifyContent: 'center',
    display: 'flex',
    marginLeft: '65px'
}}>
        <Link to="/admin/add-movie" className="btn btn-dark" >Add Movie</Link>
        <Link to="/admin/add-theater" className="btn btn-dark">Add Theater</Link>
        <Link to="/admin/add-show" className="btn btn-dark">Add Show</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
