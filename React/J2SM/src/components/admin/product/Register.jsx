import React, { useRef, useState } from "react";
import { Aside } from "../Aside";
import { postProduct } from "../../../api/productAPI";
import { useNavigate } from "react-router-dom";

const initState = {
  productName: "",
  type: "",
  price: 0,
  point: 0,
  discount: 0,
  delivery: 0,
  stock: 0,
  etc: "",
};

export const Register = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ ...initState });

  const refThumb120 = useRef();
  const refThumb240 = useRef();
  const refThumb750 = useRef();

  // 핸들러
  const changeHandler = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(product);

    // 첨부 이미지 가져오기
    const thumb120 = refThumb120.current.files[0];
    const thumb240 = refThumb240.current.files[0];
    const thumb750 = refThumb750.current.files[0];

    const formData = new FormData();
    formData.append("thumbFile120", thumb120);
    formData.append("thumbFile240", thumb240);
    formData.append("thumbFile750", thumb750);

    // 상태값 폼데이터 추가
    for (const k in product) {
      formData.append(k, product[k]);
    }

    // 서버 전송
    const fetchData = async () => {
      try {
        // 상품 등록 요청
        const data = await postProduct(formData);
        console.log(data);

        // 요청 후 다시 상품등록
        navigate("/admin/product/register");
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  };

  return (
    <main>
      <Aside />
      <section id="productRegister">
        <nav>
          <h3>상품등록</h3>
        </nav>

        <article>
          <form onSubmit={submitHandler} method="post">
            <table border="0">
              <tr>
                <td>상품명</td>
                <td>
                  <input
                    type="text"
                    name="productName"
                    value={product.productName}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>종류</td>
                <td>
                  <select name="type" onChange={changeHandler}>
                    <option>종류</option>
                    <option>과일</option>
                    <option>야채</option>
                    <option>곡류</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>가격</td>
                <td>
                  <input
                    type="text"
                    name="price"
                    value={product.price}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>포인트</td>
                <td>
                  <input
                    type="text"
                    name="point"
                    value={product.point}
                    onChange={changeHandler}
                  />
                  포인트는 가격의 1%
                </td>
              </tr>
              <tr>
                <td>할인</td>
                <td>
                  <select name="discount" onChange={changeHandler}>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="15">15%</option>
                    <option value="18">18%</option>
                    <option value="20">20%</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>배송비</td>
                <td>
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      value={"2000"}
                      onChange={changeHandler}
                    />
                    2,000원
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      value={"3000"}
                      onChange={changeHandler}
                    />
                    3,000원
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      value={"5000"}
                      onChange={changeHandler}
                    />
                    5,000원
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="delivery"
                      value={"0"}
                      onChange={changeHandler}
                    />
                    무료
                  </label>
                </td>
              </tr>
              <tr>
                <td>재고</td>
                <td>
                  <input
                    type="text"
                    name="stock"
                    value={product.stock}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
              <tr>
                <td>상품이미지</td>
                <td>
                  <p>
                    <span>상품목록 이미지(약 120 x 120)</span>
                    <input type="file" name="thumb120" ref={refThumb120} />
                  </p>
                  <p>
                    <span>기본정보 이미지(약 240 x 240)</span>
                    <input type="file" name="thumb240" ref={refThumb240} />
                  </p>
                  <p>
                    <span>상품설명 이미지(약 750 x Auto)</span>
                    <input type="file" name="thumb750" ref={refThumb750} />
                  </p>
                </td>
              </tr>
              <tr>
                <td>기타</td>
                <td>
                  <textarea
                    name="etc"
                    value={product.etc}
                    onChange={changeHandler}
                  ></textarea>
                </td>
              </tr>
            </table>

            <p>
              <a href="./productList.html" class="btnCancel">
                취소
              </a>
              <input type="submit" value="상품등록" />
            </p>
          </form>
        </article>
      </section>
    </main>
  );
};
