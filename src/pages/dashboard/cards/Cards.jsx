/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

export default function Cards({data}) {

  return (
    <div className="db_cards_container">
        <h3>As of Nov. 14, 2023</h3>
        <div className="db_cards_wrapper">
            <div className="db_cards_box">
            <div className="db_cards">
                <h1>{data.users?.total }</h1>
                <p>No. of Users</p>
            </div>
            <div className="db_cards">
                <h1>{data.parallel_groups?.total}</h1>
                <p>Total No. of Parallel Groups</p>
            </div>
            <div className="db_cards">
                <h1>{data.parallel_memship_status?.['Parallel Group Membership Status 1/ Active']}</h1>
                <p>No. of Parallel Groups</p>
                <span className="cards_active">Active</span>
            </div>
            <div className="db_cards">
                 <h1>{data.parallel_memship_status?.['Parallel Group Membership Status 2/ Inactive']}</h1>
                <p>No. of Parallel Groups</p>
                <span className="cards_inactive">Inactive</span>
            </div>
            </div>


          <div className="db_cards_box">
          <div className="db_cards bg-gray-500">
               
            </div>
            <div className="db_cards">
                <h1>{data.memship_types?.['Parallel Group Member']}</h1>
                <p>Total No. of Members</p>
            </div>
            <div className="db_cards">
                <h1>{data.memship_status?.Active}</h1>
                <p>No. of Members</p>
                <span className="cards_active">Active</span>

            </div>
            <div className="db_cards">
               <h1>{data.memship_status?.Inactive}</h1>
                <p>No. of Members</p>
                <span className="cards_inactive">Inactive</span>
            </div>
          </div>
        </div>
    </div>
  )
}
