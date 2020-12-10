import { faPaperPlane as farPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bool } from "prop-types";

function Brand({ inverse }) {
  return (
    <>
      <div className="brand-icon">
        <span className="fa-layers fa-fw text-white fa-2x mr-0">
          <FontAwesomeIcon icon={faSquare} color={inverse ? "white" : "#4bbf6b"} transform="grow-2" />
          <FontAwesomeIcon
            icon={faPaperPlane}
            color={inverse ? "#4bbf6b" : "white"}
            transform="shrink-7 left-1"
          />
        </span>
      </div>
      <div className={`brand-text ml-2 mr-3 h4 mb-0 ${inverse ? 'text-white' : 'text-primary'}`}>formaly</div>
    </>
  );
}

Brand.defaultProps = {
  inverse: false,
};

Brand.propTypes = {
  inverse: bool,
};

export default Brand;
