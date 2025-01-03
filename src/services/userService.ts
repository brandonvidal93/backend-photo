import { User } from "../entities/User";
import { userRepository } from "../repositories/userRepository";

export class UserService {
  /**
   * Gets all users from the database.
   * @returns A promise that resolves to an array of User objects.
   */
  async getAllUsers(): Promise<User[]> {
    return await userRepository.find();
  }

  /**
   * Finds a user by their document ID.
   * @param documentID The document ID to search for.
   * @returns A promise that resolves to a User object if found, or throws an error if not found.
   */
  async getUserById(documentID: string): Promise<User> {
    // Find the user by their document ID
    const user = await userRepository.findOneBy({ documentID });
    
    // If the user is not found, throw an error
    if (!user) {
      throw new Error("User not found");
    }
    // Return the user
    return user;
  }

  /**
   * Creates a new user and saves it to the database.
   * @param user A partial User object containing the information to create a new user.
   * @returns A promise that resolves to the newly created User object.
   */
  async createUser(user: Partial<User>): Promise<User> {
    // Create a new User object with the given information
    const newUser = userRepository.create(user);

    // Save the new User object to the database
    return await userRepository.save(newUser);
  }

  /**
   * Updates an existing user with new information.
   * @param documentID The document ID of the user to update.
   * @param user A partial User object containing the updated information.
   * @returns A promise that resolves to the updated User object, or null if the user is not found.
   */
  async updateUser(documentID: string, user: Partial<User>): Promise<User | null> {
    // Find the existing user by their document ID
    const existingUser = await userRepository.findOneBy({ documentID });

    // If the user is not found, return null
    if (!existingUser) {
      return null;
    }

    // Merge the updated information into the existing user
    userRepository.merge(existingUser, user);

    // Save the updated user to the database and return it
    return await userRepository.save(existingUser);
  }

  /**
   * Deletes a user from the database by their document ID.
   * @param documentID The document ID of the user to delete.
   * @throws An error if the user is not found.
   */
  async deleteUser(documentID: string): Promise<void> {
    // Attempt to delete the user with the specified document ID
    const result = await userRepository.delete({ documentID });

    // Check if any user was deleted
    if (result === null || result.affected === 0) {
      // Throw an error if no user was found with the given document ID
      throw new Error("User not found");
    }
  }
}