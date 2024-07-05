import { Line } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
import * as S from "./style";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBillListRequest } from "../../../redux/slicers/bill.slicer";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

Chart.register(...registerables);

function Dashboard() {
  const { billList } = useSelector((state) => state.bill);
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const dispatch = useDispatch();

  const params = useParams();
  useEffect(() => {
    dispatch(getBillListRequest({ hotelId: params.id }));
  }, []);

  useEffect(() => {
    if (billList?.data) {
      let updateData = [...data];
      for (let i = 0; i < billList?.data.length; i++) {
        const date = dayjs(billList?.data[i].checkInDate);
        const dateNumber = Math.ceil(
          dayjs(billList?.data[i]?.checkOutDate).diff(
            dayjs(billList?.data[i].checkInDate),
            "day",
            true
          )
        );
        updateData.splice(
          date.month(),
          1,
          updateData[date.month()] + dateNumber * billList?.data[i]?.price
        );
      }
      setData(updateData);
    }
  }, [billList?.data]);

  const renderMenu = useMemo(() => {
    return (
      <Line
        datasetIdKey="id"
        data={{
          labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          datasets: [
            {
              id: 1,
              label: "doanh thu",
              data: data,
            },
          ],
        }}
      />
    );
  }, [data]);
  return (
    <S.DashboardWrapper>
      <S.Heading>
        DOANH THU CỦA KHÁCH SẠN {billList?.data[0]?.hotel?.name} NĂM 2024
      </S.Heading>
      <S.Dashboard>{renderMenu}</S.Dashboard>
    </S.DashboardWrapper>
  );
}

export default Dashboard;
