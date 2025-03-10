import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import styles from "./ExamCards.module.css";
import NominationFormModal from "../NominationFormModal/NominationModalForm";
import ExamCardViewModal from "../ExamCardViewModal/ExamCardViewModal";

// Define the prop types
type CertificationLevel = "Beginner" | "Intermediate" | "Expert";

interface ExamCardsProps {
  provider: string;
  certificationName: string;
  level: CertificationLevel;
  description: string;
  tags: string[];
  officialLink: string;
}

const ExamCards: React.FC<ExamCardsProps> = ({
  provider,
  certificationName,
  level,
  description,
  tags,
  officialLink,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [nominationOpen, setNominationOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNominationOpen = () => {
    setNominationOpen(true);
  };

  const handleNominationClose = () => {
    setNominationOpen(false);
  };

  // Determine border color based on level
  const borderColor =
    level === "Beginner" ? "green" :
    level === "Intermediate" ? "blue" : "red";

  return (
    <div>
      <Card
        className={styles.card}
        sx={{
          height: "auto",
          width: "14.1rem",
          borderTop: `4px solid ${borderColor}`,
          borderLeft: "1px solid rgb(146, 145, 145)",
          borderRight: "1px solid rgb(146, 145, 145)",
          borderBottom: "1px solid rgb(146, 145, 145)",
          borderRadius: "10px",
          margin: "5px",
          cursor: "pointer", // Make it look clickable
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={handleClickOpen}
      >
        <CardContent>
          <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
            {provider}
          </Typography>
          <Typography sx={{ fontSize: 15 }} variant="h5" component="div">
            {certificationName}
          </Typography>
          <Typography
            sx={{ mb: 0.5, mt: 0.5, fontSize: 12, color: borderColor }}
            gutterBottom
          >
            {level}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            {description}
          </Typography>
          <div className={styles.chipContainer}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{
                  fontSize: 8,
                  height: "1.5rem",
                  margin: "1px",
                  backgroundColor: `hsl(${index * 40}, 70%, 80%)`,
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal for more information */}
      <ExamCardViewModal
        open={open}
        onClose={handleClose}
        borderColor={borderColor}
        certificationName={certificationName}
        provider={provider}
        level={level}
        description={description}
        tags={tags}
        officialLink={officialLink}
        onNominate={handleNominationOpen}
      />

      {/* Nomination Form Modal */}
      <NominationFormModal
        open={nominationOpen}
        onClose={handleNominationClose}
        certificationName={certificationName}
      />
    </div>
  );
};

export default ExamCards;
