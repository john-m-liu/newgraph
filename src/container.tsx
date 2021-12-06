import { DraggableCard } from "./draggableCard";

interface Props {
  selected: Item[];
  deselect: (index: number) => void;
  move: (dragIndex: number, hoverIndex: number) => void;
}

const style = {
  width: 250,
  justifyContent: "center",
  borderTopLeftRadius: "2px",
  borderTopRightRadius: "2px",
  backgroundColor: "rgb(235, 236, 240)",
  transition: "background-color 0.2s ease 0s",
  padding: "5px",
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container: React.FC<Props> = (props) => {
    const renderCard = (card: { id: number; text: string }, index: number) => {
      return (
        <DraggableCard
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={props.move}
          deleteCard={() => {
            props.deselect(index);
          }}
        />
      );
    };

    return (
      <>
        <div style={style}>
          {props.selected.map((card, i) => renderCard(card, i))}
        </div>
      </>
    );
};
