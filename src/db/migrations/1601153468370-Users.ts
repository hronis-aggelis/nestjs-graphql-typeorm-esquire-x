import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Users1601153468370 implements MigrationInterface {
  private userTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'userId',
        type: 'varchar',
        length: '255',
        isPrimary: true,
        isGenerated: false,
      },
      {
        name: 'default_card_ID',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'emailTemp',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'firstName',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'lastName',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'StripeCostumerID',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'isEmployer',
        type: 'boolean',
        isNullable: false,
      },
      {
        name: 'notification',
        type: 'boolean',
        isNullable: false,
      },
      {
        name: 'userAdmin',
        type: 'boolean',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'slug',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'createdDate',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'modifiedDate',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      // {
      //   name: 'freelancerFreelancerId',
      //   type: 'varchar',
      //   length: '255',
      //   isNullable: true,
      // },
    ],
  });

  // private foreignKey = new TableForeignKey({
  //   columnNames: ['freelancerFreelancerId'],
  //   referencedColumnNames: ['freelancerId'],
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  //   referencedTableName: 'freelancers',
  // });

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(this.userTable);
    //await queryRunner.createForeignKey('users', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(this.userTable);
  }
}
