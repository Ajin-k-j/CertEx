import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AllCertifications.module.css";
import ExamCards from "../../Components/ExamCards/ExamCards";

// Define the interface for certification data
type CertificationLevel = "Beginner" | "Intermediate" | "Expert";

interface CertificationData {
  provider: string;
  certificationName: string;
  level: CertificationLevel;
  description: string;
  tags: string[];
  officialLink: string;
}

const AllCertifications: React.FC = () => {
  const [data, setData] = useState<CertificationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CertificationData[]>("/Data/certifications.json");
        setData(response.data);
        
      } catch (error) {
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <ExamCards key={index} {...item} />
      ))}
    </div>
  );
};

export default AllCertifications;
