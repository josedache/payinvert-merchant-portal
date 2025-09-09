import { FC } from "react";
import { Icon as Iconify } from "@iconify/react";
import { Icon, Paper, Typography } from "@mui/material";
import * as CustomIcon from "assets/icons";

type User = {
  firstName: string;
  lastName: string;
  userEmail: string;
  mobileNumber: string;
  collectionAccountType: string;
};

type UserCardProps = {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
};

const UserCard: FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm border border-gray-300 mb-3">
      {/* Left: User Info */}
      <div className="flex items-center space-x-2">
        {/* <Icon icon="mdi:account" className="text-gray-600 text-xl" /> */}

        <CustomIcon.EditUser className="w-6 h-6 mr-5" />
        <p className="text-gray-800 font-medium">
          {user.firstName} {user.lastName},{" "}
          <span className="text-green-600 font-normal">
            {user.collectionAccountType}
          </span>
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onEdit?.(user)}
          className="text-gray-500 hover:text-gray-700 text-sm inline-flex flex-row justify-center"
        >
          Edit
          <Icon>
            <Iconify icon="mdi:chevron-right" />
          </Icon>
          {/* <Icon icon="mdi:chevron-right" className="inline text-lg" /> */}
        </button>
        <button
          onClick={() => onDelete?.(user)}
          className="text-red-500 hover:text-red-700"
        >
          <CustomIcon.DeleteUser className="w-6 h-6 mr-5" />

          {/* <Iconify
            icon={CustomIcon.DeleteUser}
            className="text-2xl mr-5 text-primary-main"
          /> */}
          {/* <Icon icon="mdi:delete-outline" className="text-xl text-red-600" /> */}
        </button>
      </div>
    </div>
  );
};

const UserPreview: FC = () => {
  const users: User[] = [
    {
      firstName: "Admin",
      lastName: "User",
      userEmail: "nad@fam.com",
      mobileNumber: "09099992882",
      collectionAccountType: "Operator",
    },
    {
      firstName: "Ehizogie",
      lastName: "Julius",
      userEmail: "ehiz@dev.com",
      mobileNumber: "08123456789",
      collectionAccountType: "Developer",
    },
  ];

  return (
    <div className="min-w-full md:min-h-[650px] flex flex-col justify-center items-center mx-auto">
      <Paper component="form" className="p-6 w-full max-w-lg">
        <Typography variant="h6">Create New User</Typography>
        <div className=" rounded-lg mt-4 space-y-6">
          {users.map((user, i) => (
            <UserCard
              key={i}
              user={user}
              //   onEdit={(u) => console.log("Edit:", u)}
              //   onDelete={(u) => console.log("Delete:", u)}
            />
          ))}

          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Add another user
            </button>
            <button className="px-4 py-2 bg-green-700 text-white rounded-lg flex items-center space-x-2 hover:bg-green-800">
              {/* <Icon icon="mdi:account-plus" /> */}
              <Icon>
                <Iconify icon="mdi:account-plus" />
              </Icon>

              <span>Create user</span>
            </button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default UserPreview;
