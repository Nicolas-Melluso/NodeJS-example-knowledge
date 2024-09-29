import mongoose from 'mongoose';
import User from './user.entity';

const tableSchema = new mongoose.Schema({
    tableId: { type: Number, required: true, alias: 'table_id' },
    gameType: { type: String, required: true, alias: 'gameType'},
    dealerId: { type: Number, required: true, default: '41', alias: 'dealer_id' },
    stackEarned: { type: Number, default: 0, alias: 'stack_earned' },
    playerList: [{ type: User, required: true, alias: 'player_list' }],
    minimumBet: { type: Number, required: true, alias: 'minimum_bet' },
    maximumBet: { type: Number, required: true, alias: 'maximum_bet' },
});

const Table = mongoose.model('Table', tableSchema);

export default Table;