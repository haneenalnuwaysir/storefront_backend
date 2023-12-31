import { UserModel } from '../../models/user';
import bcrypt from "bcrypt";

const userModel = new UserModel();

describe("User Model", () => {
    it('should have an index method', () => {
        expect(userModel.index).toBeDefined();
    });

    it('should have a show by user_id method', () => {
        expect(userModel.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(userModel.create).toBeDefined();
    });

    it('should have a edit method', () => {
        expect(userModel.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(userModel.delete).toBeDefined();
    });

    it('should have a authenticate method', () => {
        expect(userModel.authenticate).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await userModel.create({
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname'
        });
        expect(result.id).toEqual(2);
        expect(result.username).toEqual('username');
        expect(
            bcrypt.compareSync(
                'password' + process.env.BCRYPT_PASSWORD,
                result.password_digest as string
            )
        ).toBeTruthy();
        expect(result.firstname).toEqual('firstname');
        expect(result.lastname).toEqual('lastname');
    });

    it('index method should return a list of user', async () => {
        const result = await userModel.index();
        expect(result.length).toEqual(1);
        expect(result[0].id).toEqual(2);
        expect(result[0].username).toEqual('username');
        expect(
            bcrypt.compareSync(
                'password' + process.env.BCRYPT_PASSWORD,
                result[0].password_digest as string
            )
        ).toBeTruthy();
        expect(result[0].firstname).toEqual('firstname');
        expect(result[0].lastname).toEqual('lastname');
    });

    it('show method should return the correct user', async () => {
        const result = await userModel.show(2);
        expect(result.id).toEqual(2);
        expect(result.username).toEqual('username');
        expect(
            bcrypt.compareSync(
                'password' + process.env.BCRYPT_PASSWORD,
                result.password_digest as string
            )
        ).toBeTruthy();
        expect(result.firstname).toEqual('firstname');
        expect(result.lastname).toEqual('lastname');
    });

    it('edit method should update the correct user', async () => {
        const result = await userModel.edit({
            id: 2,
            firstname: 'firstnameUpdated',
            lastname: 'lastnameUpdated',
        });
        expect(result.id).toEqual(2);
        expect(result.username).toEqual('username');
        expect(
            bcrypt.compareSync(
                'password' + process.env.BCRYPT_PASSWORD,
                result.password_digest as string
            )
        ).toBeTruthy();
        expect(result.firstname).toEqual('firstnameUpdated');
        expect(result.lastname).toEqual('lastnameUpdated');
    });

    it('authenticate method should authenticate the correct user', async () => {
        const result = await userModel.authenticate('username', 'password');
        expect(
            bcrypt.compareSync(
                'password' + process.env.BCRYPT_PASSWORD,
                (result?.password_digest) as string
            )
        ).toBeTruthy();
    });

    it('delete method should remove the user', async () => {
        await userModel.delete(2);
        const result = await userModel.index()

        expect(result).toEqual([]);
    });
});