import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import MyButton from '../style/Mybutton';
import { setCategoryData, setCategoryId,setPopupUpdateCategory,setUpdateCategoryName } from '../../reducer/CategorySlice';
import axios from 'axios';
import { styled } from 'styled-components';
import { toast } from 'react-toastify';

const ListCategory = ({getAllCategory}) => {
  const dispatch=useDispatch();
  const token=useSelector((state)=>state.user?.token)
  const allCategoryDetail=useSelector((state)=>state?.category)
  const {allCategory}=allCategoryDetail;

   //update category popup
   const updateCategoryFunction=(name,id)=>{
    dispatch(setCategoryId(id))
    dispatch(setUpdateCategoryName(name))
    dispatch(setPopupUpdateCategory(true))
  }

  //delete Category 
const deleteCategory=async(id)=>{
  try{
    const res=await axios.delete(`/api/v1/category/delete-category/${id}`,{
      headers:{
        "Authorization":token
      }
    })
    if(res.data.success){
      toast.success(res.data.message)
      const data = await getAllCategory();
      if (data?.success) dispatch(setCategoryData(data?.allCategory));
    }
    else{
      toast.error(res.data.message)
    }
  }
  catch(error){
    toast.error(error.response)
  }
  }
  return (
  <>
     <Wrapper className="all-categories d-flex flex-column justify-content-center align-items-center pt-5 pb-5">
              <div className="category-header">
                <h1>LIST OF CATEGORIES</h1>
              </div>
              <div className="category-container">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        CATEGORY
                      </th>
                      <th scope="col" className="text-center"
                     
                      >
                        EDIT
                      </th>
                      <th scope="col" className="text-center"
                     
                      >
                        DELETE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allCategory.map((val)=>{
                        return(
                          <>
                        <tr>
                          <th scope="row" className="text-center">
                            {val.slug}
                          </th>
                          <td className="text-center">
                            <MyButton  onClick={()=>updateCategoryFunction(val.name,val._id)}>Edit</MyButton>
                          </td>
                          <td className="text-center">
                            <MyButton  onClick={()=>deleteCategory(val._id)}>Delete</MyButton>
                          </td>
                        </tr> 
                          </>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </Wrapper>
  </>
  )
}

export default ListCategory


const Wrapper=styled.div`
font-size: 13px;
.category-header h1{
  font-size:2.5vmax;
  font-weight:bold;
  margin-bottom:1vmax;
}
.category-container{
  font-size:15px;
  width:100%;
  table{
    width:100%;
    thead tr th{
      font-weight:bold;
    }
  }
}
@media (max-width:${({ theme }) => theme.responsive.Small}){
.category-container{
  width:100%;
}
}
`;