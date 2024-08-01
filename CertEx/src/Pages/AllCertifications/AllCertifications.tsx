import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AllCertifications.module.css";
import ExamCards from "../../Components/ExamCards/ExamCards";

// Define the type for certification level and criticality
type CertificationLevel = "Beginner" | "Intermediate" | "Expert";
type CriticalLevel = "high" | "medium" | "low";

// Define the interface for certification data
interface CertificationData {
  id: number; // Unique identifier for each certification
  provider: string;
  certification_name: string; // Name of the certification
  level: CertificationLevel;
  description: string;
  tags: string[];
  official_link: string;
  critical: CriticalLevel; // Criticality level
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
      {data.map((item) => (
        <ExamCards key={item.id} {...item} />
      ))}
    </div>
  );
};

export default AllCertifications;
