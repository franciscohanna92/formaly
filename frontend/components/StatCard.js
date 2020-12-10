const { default: Icon } = require("./Icon");

function StatCard({ title, variant, value, icon }) {
  return (
    <div className={`card border-left-${variant} h-100 py-2`}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className={`text-xs text-${variant} text-uppercase mb-1`}>
              {title}
            </div>
            <div className="h4 mb-0 font-weight-bold text-dark">{value}</div>
          </div>
          <div className="col-auto">
            <Icon className="text-gray-300" name={icon} transform="grow-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard