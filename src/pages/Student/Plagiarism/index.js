import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getGroupById } from "../../../store/group/actions";

export const Plagiarism = () => {
  const { groupID, fileID } = useParams();
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  const group = useSelector((state) => state.groups.editGroup);

  useEffect(() => {
    dispatch(getGroupById(groupID));
  }, [dispatch]);

  useEffect(() => {
    const thisFile = group?.files.find((file) => file._id === fileID);
    setFile(thisFile);
    console.log(groupID);
  }, [group]);

  const [uncollapseItem, setUncollapseItem] = useState(null);

  const handleCollapse = (id) => {
    if (uncollapseItem === id) setUncollapseItem(null);
    else setUncollapseItem(id);
  };
  const isUncollapsed = (id) => uncollapseItem === id;

  const sourceElements = file?.sources?.map((source) => {
    const matchElement = source?.matches.map((match) => {
      return (
        <tr key={`group_${match._id}`} className="table-row">
          <td>{match.inputStart}</td>
          <td>{match.inputEnd}</td>
          <td>{match.matchText}</td>
          <td>{match.score}</td>
        </tr>
      );
    });
    return (
      <>
        <tr key={`group_${source._id}`} className="table-row">
          <td />
          <td>{source.url}</td>
          <td>{source.title}</td>
          <td>
            <a
              className="btn btn-sm text-nowrap"
              role="button"
              onClick={() => handleCollapse(source._id)}
            >
              show
            </a>
          </td>
        </tr>
        <tr
          className={"collapse" + (isUncollapsed(source._id) ? " show" : "")}
          id="collapseExample"
        >
          <td colSpan={4}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th width="15%">From</th>
                  <th width="15%">To</th>
                  <th width="50%">Match Text</th>
                  <th width="20%">Score</th>
                </tr>
              </thead>
              {source?.matches && <tbody>{matchElement}</tbody>}
            </table>
          </td>
        </tr>
      </>
    );
  });

  return (
    <Fragment>
      <div className="card shadow mb-4">
        {/* Table Header */}
        <div className="card-header py-3" />

        {/* Tables */}
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing={0}
            >
              <thead>
                <tr>
                  <th width="5%"></th>
                  <th width="35%">Url</th>
                  <th width="35%">Tựa đề</th>
                  <th width="25%"></th>
                </tr>
              </thead>
              {file?.sources && <tbody>{sourceElements}</tbody>}
            </table>
            {(!file?.sources || file.sources.length === 0) && (
              <span>Nhóm không tồn tại</span>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
