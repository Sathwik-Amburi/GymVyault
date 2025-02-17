import { Grid, Typography, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { PurchaseOption } from "../../models/allModels";
import { CartItem } from "./PurchaseCart";

interface GridProps {
  bases: PurchaseOption[];
  optionals: PurchaseOption[];
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  editable: boolean;
}

const PurchaseGrid: FC<GridProps> = (props: GridProps) => {
  const [selected, setSelected] = useState<String>("1");
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  useEffect(() => {
    if (props.cart.length > 0) {
      setSelected(props.cart[0]._id);
    }
  }, [props.bases]);
  let defaultBg = "#999";

  return (
    <Grid
      container
      style={{
        padding: "1em",
      }}
    >
      <Grid item xs={12}>
        <br></br>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Ticket Format
        </Typography>
        <hr className="mini-hr" />
      </Grid>
      {props.bases.map((item) => (
        <Grid
          item
          md={6}
          xs={12}
          key={item._id}
          style={{
            borderRadius: "12px",
            height: "100%",
          }}
        >
          <Paper
            style={{
              backgroundColor: selected == item._id ? item.bgColor : defaultBg,
              color: item.fgColor,
              borderRadius: "12px",
              padding: "1.5em",
              margin: "1em",
            }}
            onClick={() => {
              if (props.editable) {
                setSelected(item._id);
                let cart = props.cart.filter((item) => !item.base); // only 1 "base" element at a time!
                let cartItem = {
                  name: item.name,
                  description: item.description,
                  price: item.price,
                  priceDiscount: item.priceDiscount,
                  base: true,
                  _id: item._id,
                } as CartItem;
                // base elem first, options after
                props.setCart([cartItem].concat(cart));
              }
            }}
          >
            {props.editable ? (
              <span style={{ fontSize: "1.5em" }}>
                {selected == item._id ? (
                  <i className="fas fa-circle-check"></i>
                ) : (
                  <i className="fa-regular fa-circle"></i>
                )}
              </span>
            ) : null}

            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                textAlign: "right",
                float: "right",
              }}
            >
              <span
                style={{
                  display: "block",
                  textDecoration: item.priceDiscount ? "line-through" : "none",
                  fontSize: item.priceDiscount ? "0.7em" : "1em",
                  color: item.priceDiscount ? "#c10000" : "white",
                }}
              >
                {item.price}
                {isNaN(item.price) ? "" : "€"}
              </span>
              {item.priceDiscount ? item.priceDiscount + "€" : null}
            </Typography>
            <div
              style={{
                marginTop: "3em",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{item.name}</span>
              <br />
              <br />
              <span>{item.description}</span>
            </div>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12}>
        <br></br>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Optionals
        </Typography>
        <hr className="mini-hr" />
      </Grid>

      {props.optionals.length > 0 && (
        <span>
          <hr />
        </span>
      )}
      {props.optionals.map((item) => (
        <Grid
          item
          md={6}
          xs={12}
          key={item._id}
          style={{
            borderRadius: "12px",
            height: "100%",
          }}
        >
          <Paper
            style={{
              backgroundColor: selectedOption.includes(item._id)
                ? item.bgColor
                : defaultBg,
              color: selectedOption.includes(item._id) ? item.fgColor : "#fff",
              borderRadius: "12px",
              padding: "1.5em",
              margin: "1em",
            }}
            onClick={() => {
              if (props.editable) {
                setSelectedOption(
                  selectedOption.includes(item._id)
                    ? selectedOption.filter((id) => id !== item._id)
                    : [...selectedOption, item._id]
                );

                // firstly remove the element from the cart
                props.setCart(props.cart.filter((i) => i._id !== item._id));

                // then add it back to the bottom if needed
                if (!selectedOption.includes(item._id)) {
                  props.setCart(
                    props.cart.concat([
                      {
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        priceDiscount: item.priceDiscount,
                        base: false,
                        _id: item._id,
                      } as CartItem,
                    ])
                  );
                }
              }
            }}
          >
            {props.editable ? (
              <span style={{ fontSize: "1.5em" }}>
                {selectedOption.includes(item._id) ? (
                  <i className="fas fa-circle-check"></i>
                ) : (
                  <i className="fa-regular fa-circle"></i>
                )}
              </span>
            ) : null}
            <Typography
              variant="h6"
              style={{
                fontWeight: "bold",
                float: "right",
              }}
            >
              {item.price > 0 ? item.price + "€" : "free"}
            </Typography>
            <div
              style={{
                marginTop: "3em",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{item.name}</span>
              <br />
              <br />
              <span>{item.description}</span>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PurchaseGrid;
