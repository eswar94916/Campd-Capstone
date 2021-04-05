// Listing.js

import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Listing.scss";

import { Link } from "react-router-dom";

import TextTruncate from "react-text-truncate";
import moment from "moment";

const Project = ({
    project: {
        name,
        owner,
        contactInfo,
        status,
        statuses,
        description,
        gitRepo,
        tags,
        image,
        userGuide,
        developerGuide,
        installationGuide,
        _id,
        date,
    },
    onDelete,
    onView,
    index,
}) => {
    const newTo = {
        pathname: "/viewproject",
    };

    const projectStatus = function () {
        if (statuses.isProposal) {
            return "Proposal";
        }

        for (const thisStatus of Object.keys(statuses)) {
            if (thisStatus != "isApproved" && thisStatus != "isRecruiting" && statuses[thisStatus]) {
                return thisStatus.substring(2);
            }
        }
    };

    const statusStyle = function () {
        var thisStatus = projectStatus();
        switch (thisStatus) {
            case "Proposal":
                return "tag-proposal alert-info";
                break;
            case "Active":
                return "tag-active";
                break;
            case "Paused":
                return "tag-paused";
                break;
            case "Stopped":
                return "tag-stopped";
                break;
            case "Archived":
                return "tag-archived";
                break;
        }
    };

    const recruitingStatus = function () {
        if (statuses.isRecruiting) {
            return "Recruiting";
        }
    };

    const recruitingStyle = function () {
        if (!statuses.isRecruiting) {
            return "d-none";
        } else {
            return "tag-recruiting";
        }
    };

    const approvalStatus = function () {
        if (statuses.isApproved) {
            return "Approved";
        } else {
            return "Pending Approval";
        }
    };

    const approvalStyle = function () {
        if (statuses.isApproved) {
            return "d-none";
        } else {
            return "tag-pending";
        }
    };

    const dateParsed = moment(date);

    const CardImage = (props) => {
        if (props.image) {
            return (
                <div className="col-3">
                    <img alt="Project" src={`image/${props.image}`} className="img-fluid" />
                </div>
            );
        }
        return null;
    };

    return (
        <div className={`listing card mb-5 bg-${index % 2}`}>
            <div className="card-header d-flex justify-content-between">
                <div>
                    <h4 className="">{name}</h4>
                    <h5 className="mb-0 text-muted">{owner}</h5>
                </div>

                <p className="mb-0">{dateParsed.format("MMMM D, YYYY")}</p>
            </div>
            <div className="card-body">
                <div className="row">
                    <CardImage image={image} />
                    <div className="col">
                        <TextTruncate text={description} line={5} />
                        <div className="mt-2">
                            <Link to={newTo} onClick={() => onView(_id)} className="text-color-primary">
                                More Details
                            </Link>
                            {gitRepo !== "" && (
                                <a href={gitRepo} className="ml-3" target="_blank" rel="noopener noreferrer">
                                    View GitHub Source
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <div className="tag-container d-flex flex-wrap">
                    <span className={"tag " + approvalStyle()}>{approvalStatus()}</span>
                    <span className={"tag " + statusStyle()}>{projectStatus()}</span>
                    <span className={"tag " + recruitingStyle()}>{recruitingStatus()}</span>
                    {tags.map((tag) => {
                        return (
                            <span className="tag tag-custom">
                                <span className="text-muted">#</span>
                                {tag}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* <div className="project-card-body">
                <div className="tag-display">
                    <ul className="d-flex flex-wrap">
                        <li className={"tag text-white " + approvalStyle()}>{approvalStatus()}</li>
                        <li className={"tag text-white " + statusStyle()}>{projectStatus()}</li>
                        <li className={"tag text-white " + recruitingStyle()}>{recruitingStatus()}</li>

                        {tags.map((tag) => {
                            return (
                                <li className="tag bg-light" key={tag}>
                                    {tag}{" "}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default Project;
